import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  loadheader: any;

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line:typedef
  validateBvnNumber(bvn, encodedHashValue, reference, clientId){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `HeritageAuth ${btoa(clientId)}`,
        Reference: reference,
        Signature: encodedHashValue,
        UniqueKey: 'E543F500-095E-11EB-93B7-1DCB77448E1F'
     })
    };
    const params = new HttpParams()
    .set('bvn', bvn);
    return this.http.get(`${environment.baseUrl}/transactions/BVNValidation?${params}`, options);
  }

  // tslint:disable-next-line:typedef
  openAccount(payload, reference, clientId, encodedHashValue){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `HeritageAuth ${btoa(clientId)}`,
        Reference: reference,
        Signature: encodedHashValue,
        UniqueKey: 'E543F500-095E-11EB-93B7-1DCB77448E1F'
     })
    };
    return this.http.post<any>(`${environment.baseUrl}/accounts/AccountOpening/WithBVN`, payload, options);
  }

  // tslint:disable-next-line:typedef
  getBranches(encodedHashValue, reference, clientId){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `HeritageAuth ${btoa(clientId)}`,
        Reference: reference,
        Signature: encodedHashValue,
        UniqueKey: 'E543F500-095E-11EB-93B7-1DCB77448E1F'
     })
    };
    return this.http.get(`${environment.baseUrl}/accounts/GetBankBranches`, options);
  }

  // tslint:disable-next-line:typedef
  validateBvnNumberCheck(bvn, encodedHashValue, reference, clientId){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `HeritageAuth ${btoa(clientId)}`,
        Reference: reference,
        Signature: encodedHashValue,
        UniqueKey: 'E543F500-095E-11EB-93B7-1DCB77448E1F'
     })
    };
    const params = new HttpParams()
    .set('bvn', bvn);
    return this.http.get(`${environment.baseUrl}/accounts/CustomerInquiryWithBVN?${params}`, options);
  }

  // tslint:disable-next-line:typedef
  documentUpload(payload, encodedHashValue, reference, clientId){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `HeritageAuth ${btoa(clientId)}`,
        Reference: reference,
        Signature: encodedHashValue,
        UniqueKey: 'E543F500-095E-11EB-93B7-1DCB77448E1F'
     })
    };
    return this.http.post<any>(`${environment.baseUrl}/easyAccount/Documents/Upload/Website`, payload, options);
  }

  getAllBranchStateByState(id, encodedHashValue, reference, clientId){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `HeritageAuth ${btoa(clientId)}`,
        Reference: reference,
        Signature: encodedHashValue,
        UniqueKey: 'E543F500-095E-11EB-93B7-1DCB77448E1F'
     })
    };
    return this.http.get(`${environment.baseUrl}/easyAccount/BranchesByState/${id}`, options);
  }



}
