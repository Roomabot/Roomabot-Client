/**
 * RosTopic
 */
export interface RosTopic{
  topic: string
  msgType: string
} 

/**
 * All available topics 
 */
export const ROS_TOPICS: {[key: string]: RosTopic}= {
  MAP: { topic: '/map', msgType: 'nav_msgs/OccupancyGrid'},
}