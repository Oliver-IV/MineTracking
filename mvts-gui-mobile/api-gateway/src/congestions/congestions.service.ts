import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CongestionByIdDTO, CongestionCreateDTO, CongestionDTO, CongestionServiceClient, EmptyMessage, GetCongestionByDateRequest, ListCongestionDTO } from './protos/congestion_service';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class CongestionsService implements OnModuleInit, CongestionServiceClient{
  private congesService : CongestionServiceClient;
  constructor(@Inject('CONGESTION_PACKAGE') private client : ClientGrpc){}
  getByDate(request: GetCongestionByDateRequest): Observable<ListCongestionDTO> {
    return this.congesService.getByDate(request);
  }
  
  onModuleInit() {
    this.congesService = this.client.getService<CongestionServiceClient>('CongestionService');
  }
  
  createCongestion(request: CongestionCreateDTO): Observable<CongestionByIdDTO> {
    return this.congesService.createCongestion(request);
  }
  getCongestionById(request: CongestionByIdDTO): Observable<CongestionDTO> {
    return this.congesService.getCongestionById(request);
  }
  getAll(request: EmptyMessage): Observable<ListCongestionDTO>{
    return this.congesService.getAll(request);
  }

}
