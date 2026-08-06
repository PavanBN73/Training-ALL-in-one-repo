import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FundTransferService, Account } from './fundTransfer.service';

describe('FundTransferService', () => {
  let service: FundTransferService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/accounts';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(FundTransferService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAccounts should request all accounts', () => {
    const mockAccounts: Account[] = [
      { id: 1, accountNumber: '111', balance: 100 },
      { id: 2, accountNumber: '222', balance: 200 },
    ];

    service.getAccounts().subscribe((accounts) => {
      expect(accounts).toEqual(mockAccounts);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockAccounts);
  });

  it('transferFunds should POST transfer history', () => {
    const response = { id: 1, fromAccount: '111', toAccount: '222', amount: 50 }; 

    service.transferFunds('111', '222', 50).subscribe((result) => {
      expect(result).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:3000/transfers');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(
      expect.objectContaining({
        fromAccount: '111',
        toAccount: '222',
        amount: 50,
      })
    );

    req.flush(response);
  });
});
