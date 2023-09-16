import { Client } from './client';

export interface ClientRepository {
  createClient(client: Client): Promise<void>;

  findClientByDni(dni: string): Promise<Client | null>;

  findAllClients(): Promise<Client[]>;
}
