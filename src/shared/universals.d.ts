/**
 * @description Declare event types for listening with listenTS() and dispatching with dispatchTS()
 */

export type EventTS = {
  showAlert: {
    message: string,
    color: string,
    timeout: number,
  },
};