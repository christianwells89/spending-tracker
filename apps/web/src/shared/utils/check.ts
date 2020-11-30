export function assertUnreachable(message: string, _value: never): never {
  throw new Error(message);
}
