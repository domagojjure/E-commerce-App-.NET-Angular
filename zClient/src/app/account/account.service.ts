import { Injectable } from '@angular/core';
import {  ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Address, User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService { // when the user logs in, we're going to store that user in the account service

  baseUrl=environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1); // caches 1 value whatever it is 
  currentUser$=this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string | null){
    if (token===null){
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders()
    headers=headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(this.baseUrl+'account', {headers}).pipe(
      map(user=>{ 
        if(user ){
          localStorage.setItem('token',user.token); 
          this.currentUserSource.next(user);
          return user;
        } else{
          return null;
        }
        
        }
      )
    )
  }

  login(values:any){
    return this.http.post<User>(this.baseUrl+'account/login',values).pipe(
      map(user=>{ // map is used to manipulate all emitted data
        localStorage.setItem('token',user.token); // these two lines will be executed for every user
        this.currentUserSource.next(user); //next emits new values to subscribers of of the "BehaviorSubject"
      })
    )
  }

  register(values: any ){
    return this.http.post<User>(this.baseUrl+'account/register',values).pipe(
      map(user=>{ // map is used to manipulate all emitted data
        localStorage.setItem('token',user.token); // these two lines will be executed for every user
        this.currentUserSource.next(user); //next emits new values to subscribers of of the "BehaviorSubject"
      })
    )
  }

  logout(){
    localStorage.removeItem('token')
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/')
  }

  checkEmailExists(email:string){
    return this.http.get<boolean>(this.baseUrl+'account/emailExists?email='+email)
  }

  getUserAddress() {
    return this.http.get<Address>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: Address) {
    return this.http.put<Address>(this.baseUrl + 'account/address', address);
  }
}
