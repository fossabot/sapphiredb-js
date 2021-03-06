import {SapphireDbOptions} from '../models/sapphire-db-options';
import {ResponseBase} from '../command/response-base';
import {CommandBase} from '../command/command-base';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {AuthTokenState, ConnectionInformation, ConnectionState} from '../models/types';

export abstract class ConnectionBase {
  public messageHandler: (message: ResponseBase) => void;

  public connectionInformation$ = new BehaviorSubject<ConnectionInformation>({
    connectionId: null,
    readyState: ConnectionState.disconnected
  });

  public checkAuthToken: () => Observable<AuthTokenState>;

  public abstract send(object: CommandBase, storedCommand: boolean): Subscription;
  public abstract setData(options: SapphireDbOptions, authToken?: string): void;

  public updateConnectionInformation(readyState: ConnectionState, connectionId?: string) {
    const connectionInformation = this.connectionInformation$.value;
    connectionInformation.readyState = readyState;
    connectionInformation.connectionId = connectionId;
    this.connectionInformation$.next(connectionInformation);
  }
}
