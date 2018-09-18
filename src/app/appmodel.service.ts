import { Injectable } from '@angular/core'; // importing the OnInit interface

// import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';
import CozyClient from 'cozy-client';

@Injectable()

export class DataService {

   client: any;
   dbdata: any;
    dballdata: any;
   setConnect(tokenparam, domain) {
    const  cozyclient = new CozyClient({
      uri: 'http://' + domain,
      token: tokenparam
  });
    this.client = cozyclient;
  }

  public getDelta() {
      const query =  this.client.query(
        this.client.find('io.sedela.writings').where({id: 'mydocument'})
      ).then(
        ({ data }) => this.dbdata = data
      );

   //console.log('query de data service: ', this.dbdata);
    // return query;
   return this.dbdata[0];

  }
  public getAllDocs() {
      const query =  this.client.query(
        this.client.find('io.sedela.writings')
      ).then(
        ({ data }) => this.dballdata = data
      );
  
  //console.log('query: ', query);
  //console.log('query: ', query[0].length);
   //console.log('query de all data service: ', this.dballdata);
    // return query;
   return this.dballdata[0];

  }
  public postDelta(opss: any, name: string) {
    const document  = {id: name, ops: opss, create_date: new Date(), last_modif: new Date()};
    this.client.mutate(
        this.client.create('io.sedela.writings', document)
         ).then(
       ({ data }) => console.log(data.id)
   );
    return this.getAllDocs();
  }


  public getForum() {
    const query =  this.client.query(
      this.client.find('io.sedela.comments').sortBy({date_post: 'desc'})
    ).then(
      ({ data }) => console.log(data)
    );

 return query;
  }

  public postForum(posts: any) {
    //const post = {subject: posts.subject, comment: posts.subject, date_post: posts.date };
    const   post = {posts: posts}
    this.client.mutate(
        this.client.create('io.sedela.comments', post)
         ).then(
       ({ data }) => console.log(data)
   );

  }

   public deleteForum() {
        this.client.delete('io.sedela.comments');
  }

}
