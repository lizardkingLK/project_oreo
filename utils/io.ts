export const handleEvent = (
  isLocal: boolean,
  localHandler: object,
  cloudHandler: object,
  event?: string,
  params?: object
) => {
  if (isLocal) {
  } else {
  }
  console.log({ isLocal, localHandler, cloudHandler, event, params });
};
