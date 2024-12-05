import mitt from "mitt";
type Events = {
  goLogin: void;
  setOpen: boolean;
};
export const emitter = mitt<Events>();
