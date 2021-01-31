export interface MapData {
  data: number[]
  header: {
    frame_id: string
    seq: number,
    stamp: {
      nsecs: number,
      secs: number
    }
  }
  info: {
    height: number,
    map_load_time: {secs: number, nsecs: number},
    origin: {
      position: {
        x: number,
        y: number,
        z: number,
      },
      orientation: {
        w: number,
        x: number,
        y: number,
        z: number,
      }
    },
    resolution: number,
    width: number
  }

}