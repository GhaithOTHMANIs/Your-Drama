import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/Classes/event';
import { PiecesService } from 'src/app/Services/pieces.service';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit{
  tabPlays:Event[]=[];
  val:string ="";

  constructor(private servicePiece:PiecesService){}
  ngOnInit(){
    this.servicePiece.getPlaysTable().subscribe( 
      data => this.tabPlays=data
    );
  }

  onSearch(text:string){
    
    if(text!=""){ 
      if (!isNaN(Number(text))){
        this.servicePiece.getPlaysTableById(text).subscribe( 
          data => this.tabPlays=data
        );
      }
      else{
        this.servicePiece.getPlaysTableByName(text).subscribe( 
          data => this.tabPlays=data
        );
      }
    }
    else{
      this.servicePiece.getPlaysTable().subscribe( 
        data => this.tabPlays=data
      );
    }
  }

  deleteRequestSend(deleteRequest:number){
    this.servicePiece.deletePlaysTableById(deleteRequest).subscribe( 
      data => this.tabPlays=this.tabPlays.filter(function(elt){return elt.id!=deleteRequest})
    );
    alert("Change saved successfully!");
  }

  onCancel(){
    this.servicePiece.getPlaysTable().subscribe( 
      data => this.tabPlays=data
    );
    this.val="";
  }
}