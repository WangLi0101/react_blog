import mitt from "mitt";
type Events = {
  goLogin: void;
};
export const emitter = mitt<Events>();
