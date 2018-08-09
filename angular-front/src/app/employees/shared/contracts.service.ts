import { Injectable } from '@angular/core';
//import rouletteAbi from '../../abi/userregister';
import { BehaviorSubject, Observable } from 'rxjs/';
import Web3 from 'web3';
import {UserRegister} from "../models/user-register";

declare let require: any;
declare let window: any;
let tokenAbi = require('../../abi/userregister.json');
const HDWalletProvider = require("truffle-hdwallet-provider");
let mnemonic = "YOUR MNEMONIC WORDS";
let accessToken = "https://rinkeby.infura.io/v3/YOUR-ACCOUNT-INFURA";
const provider = new HDWalletProvider(mnemonic, accessToken);

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  private _web3: any;

  private _tokenContract: any;
  private _tokenContractAddress: string = 'YOUR ADDRES METAMASK';
  contract;
  dataUser: BehaviorSubject<any> = new BehaviorSubject(<any>0);

  constructor() {
    this._web3 = new Web3(provider);
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(provider);
      this._tokenContract = new this._web3.eth.Contract(tokenAbi, this._tokenContractAddress);
    }
  }

  getAccounts(): Observable<any> {
    return Observable.create(observer => {
      this._web3.eth.getAccounts((err, accs) => {
        if (err != null) {
          observer.error('There was an error fetching your accounts.')
        }

        if (accs.length === 0) {
          observer.error('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
        }

        observer.next(accs)
        observer.complete()
      });
    })
  }

  setUser(employeeId: number, firstName: string, lastName: string, empCode: string,
          position: string, office: string): Observable<any> {
    return Observable.create(observer => {
      this._tokenContract.methods.setUser(employeeId, firstName, lastName, empCode, position, office).send({
        from: this._tokenContractAddress
      }).on('transactionHash', function(hash){
        observer.next(hash)
        observer.complete()
      })
    })
  }

  getUser(): Observable<any> {
    return Observable.create(observer => {
     /* console.log(this._tokenContract.methods.firstName().call().then(function(v) {
        var strName= v.toString();
        console.log("Name: "+ strName);
      }))*/
    })
  }

/*
  setUser(data: UserRegister): Observable<UserRegister> {
    let meta;
    return Observable.create(observer => {
      this._web3.eth.deployed().then(instance => {
          meta = instance;
          return meta.setUser(data, {
            from: this._tokenContractAddress
          });
        })
        .then(() => {
          observer.next()
          observer.next()
        })
        .catch(e => {
          console.log(e);
          observer.error(e)
        });
    })
  }*/



}
