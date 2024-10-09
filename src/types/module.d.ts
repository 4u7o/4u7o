export interface Module {
  name: string;
  load: () => void;
  reload: () => void;
  unload: () => void;
}
