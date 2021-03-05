import { RosOptions } from './rosOptions';
import ROSLIB from 'roslib'
import { Action, createAction, Dispatch, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit';
import { open, message } from '../websocket/WebsocketActions'
/**
 * ReduxROS
 * @class
 *
 * Manages a ROS connection.
 */
export class ReduxROS{

  ros: any
  lastConnectPayload: any;
  url: string;
  
  /**
   * 
   * @param {RosOptions} options 
   */
  constructor(private options: RosOptions){
    // this.ros = new ROSLIB(options.uri)
  }

  // Keep track of if the WebSocket connection has ever successfully opened.
  private hasOpened = false;


  /**
   * ROS connect handler.
   *
   * @param {MiddlewareAPI} store
   * @param {Action} action
   */
  connect = ({ dispatch }: MiddlewareAPI, { payload }: PayloadAction<{url: string}>) => {
    this.close();
    // prefix needed to distinguish ros specific actions
    const { prefix } = this.options;
    this.url = payload.url
    this.lastConnectPayload = payload;
    // create new ros connection
    this.ros = new ROSLIB.Ros({
      url: payload.url
    })
    this.ros.on('connection', () => this.handleOpen(dispatch, prefix, this.options.onOpen))
    this.ros.on('error', (err) => this.handleError(dispatch, prefix, err))
    this.ros.on('close', () => this.handleClose(dispatch, prefix))

    // this.websocket.addEventListener('message', (event) =>
    //   this.handleMessage(dispatch, prefix, deserializer, event)
    // );
    var mapTopic = new ROSLIB.Topic({
      ros : this.ros,
      name : '/map',
      messageType : 'nav_msgs/OccupancyGrid'
    })

    mapTopic.subscribe(message => {
      console.log('map recieved')
      this.handleMessage(dispatch, message)
    })

  };

  /**
   * Subsribes to a ROS topic
   * @param {MiddlewareAPI} store
   * @param {Action} action
   */
  subscribe = ({ dispatch }: MiddlewareAPI, { payload }: PayloadAction<{topic: string}>) => {
    this.close();
    /**
     * Subribes to a topic and listens for any updates. 
     */
    
    // prefix needed to distinguish ros specific actions
    const { prefix } = this.options;
    this.topic = payload.topic
    this.lastConnectPayload = payload;
    // create new ros connection
    this.ros = new ROSLIB.Ros({
      url: payload.url
    })
    this.ros.on('connection', () => this.handleOpen(dispatch, prefix, this.options.onOpen))
    this.ros.on('error', (err) => this.handleError(dispatch, prefix, err))
    this.ros.on('close', () => this.handleClose(dispatch, prefix))

    // this.websocket.addEventListener('message', (event) =>
    //   this.handleMessage(dispatch, prefix, deserializer, event)
    // );
    var mapTopic = new ROSLIB.Topic({
      ros : this.ros,
      name : '/map',
      messageType : 'nav_msgs/OccupancyGrid'
    })

    mapTopic.subscribe(message => {
      console.log('map recieved')
      this.handleMessage(dispatch, message)
    })

  };

  /**
   * WebSocket disconnect event handler.
   *
   * @throws {Error} Socket connection must exist.
   */
  disconnect = () => {
    if (this.ros) {
      this.close();
    } else {
      throw new Error(
        'Connection to ROS not initialized. Dispatch ROS_CONNECT first'
      );
    }
  };

  // /**
  //  * WebSocket send event handler.
  //  *
  //  * @param {MiddlewareAPI} _store
  //  * @param {Action} action
  //  *
  //  * @throws {Error} Socket connection must exist.
  //  */
  // send = (_store: MiddlewareAPI, { payload }: Action) => {
  //   if (this.websocket) {
  //     if (this.options.serializer) {
  //       this.websocket.send(this.options.serializer(payload));
  //     } else {
  //       throw new Error('Serializer not provided');
  //     }
  //   } else {
  //     throw new Error(
  //       'Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first'
  //     );
  //   }
  // };

  /**
   * Handle a close event.
   *
   * @param {Dispatch} dispatch
   * @param {string} prefix
   */
  private handleClose = (dispatch: Dispatch, prefix: string) => {
    // dispatch(closed(prefix));

    // Conditionally attempt reconnection if enabled and applicable
    // const { reconnectOnClose } = this.options;
    // if (reconnectOnClose && this.canAttemptReconnect()) {
    //   this.handleBrokenConnection(dispatch);
    // }
  };

  /**
   * Handle an error event.
   *
   * @param {Dispatch} dispatch
   * @param {string} prefix
   * @param {Event} event
   */
  private handleError = (dispatch: Dispatch, prefix: string, error) => {
    dispatch(error(null, new Error(error), prefix));

    // Conditionally attempt reconnection if enabled and applicable
    // const { reconnectOnError } = this.options;
    // if (reconnectOnError && this.canAttemptReconnect()) {
    //   this.handleBrokenConnection(dispatch);
    // }
  };

  /**
   * Handle an open event.
   *
   * @param {Dispatch} dispatch
   * @param {string} prefix
   * @param {(s: WebSocket) => void | undefined} onOpen
   * @param {Event} event
   */
  private handleOpen = (
    dispatch: Dispatch,
    prefix: string,
    onOpen: ((rosConnection: any) => void) | undefined,
  ) => {
    // Clean up any outstanding reconnection attempts.
    // if (this.reconnectionInterval) {
    //   clearInterval(this.reconnectionInterval);

    //   this.reconnectionInterval = null;
    //   this.reconnectCount = 0;

    //   dispatch(reconnected(prefix));
    // }

    // Hook to allow consumers to get access to the raw socket.
    if (onOpen && this.ros != null) {
      onOpen(this.ros);
    }

    // Now we're fully open and ready to send messages.
  dispatch(open());

    // Track that we've been able to open the connection. We can use this flag
    // for error handling later, ensuring we don't try to reconnect when a
    // connection was never able to open in the first place.
    this.hasOpened = true;
  };

  /**
   * Handle a topic event.
   *
   * @param {Dispatch} dispatch
   * @param {string} prefix
   * @param {MessageEvent} event
   */
  private handleMessage = (
    dispatch: Dispatch,
    data: any
  ) => {
    dispatch(message(data));
  };

  /**
   * Close the WebSocket connection.
   * @private
   *
   * @param {number} [code]
   * @param {string} [reason]
   */
  private close = (code?: number, reason?: string) => {
    if (this.ros) {
      this.ros.close(
        code || 1000,
        reason || 'WebSocket connection closed by redux-websocket.'
      );

      this.ros = null;
      this.hasOpened = false;
    }
  };

  /**
   * Handle a broken socket connection.
   * @private
   *
   * @param {Dispatch} dispatch
   */
  /*
  private handleBrokenConnection = (dispatch: Dispatch) => {
    const { prefix, reconnectInterval } = this.options;

    this.websocket = null;

    // First, dispatch actions to notify Redux that our connection broke.
    dispatch(broken(prefix));
    dispatch(beginReconnect(prefix));

    this.reconnectCount = 1;

    dispatch(reconnectAttempt(this.reconnectCount, prefix));

    // Attempt to reconnect immediately by calling connect with assertions
    // that the arguments conform to the types we expect.
    this.connect(
      { dispatch } as MiddlewareAPI,
      { payload: this.lastConnectPayload } as Action
    );

    // Attempt reconnecting on an interval.
    this.reconnectionInterval = setInterval(() => {
      this.reconnectCount += 1;

      dispatch(reconnectAttempt(this.reconnectCount, prefix));

      // Call connect again, same way.
      this.connect(
        { dispatch } as MiddlewareAPI,
        { payload: this.lastConnectPayload } as Action
      );
    }, reconnectInterval);
  };
  */

  // Only attempt to reconnect if the connection has ever successfully opened,
  // and we're not currently trying to reconnect.
  //
  // This prevents ongoing reconnect loops to connections that have not
  // successfully opened before, such as net::ERR_CONNECTION_REFUSED errors.
  //
  // This also prevents starting multiple reconnection attempt loops.
  // private canAttemptReconnect(): boolean {
  //   return this.hasOpened && this.reconnectionInterval == null;
  // }
}