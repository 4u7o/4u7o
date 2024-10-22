export interface Module {
  name: string;
  load: (client?: _4u7oClient) => void;
  reload: () => void;
  unload: () => void;
}
