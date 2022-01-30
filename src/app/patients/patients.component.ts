import {AfterViewInit, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {data} from "jquery";
import firebase from "firebase/compat";
import firestore = firebase.firestore;
import {Patient} from "../patient";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})

export class PatientsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;
  patient: Patient[] = [];
  public displayedColumns: string[] = ['name', 'country', 'dateofbirth', 'maiden', 'ssn'];
  public obj: Object;
  public patients;
  public dataSource = new MatTableDataSource<Patient>();
  constructor(private firestore: AngularFirestore) {
    this.patients = firestore.collection('Patients').valueChanges()

  }
  asd = (event.target as HTMLInputElement).value;




  ngOnInit(): void {
    this.getPatientName();
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  getPatientName() {
    this.firestore.collection('Patients').valueChanges().subscribe((res: Patient[]) => {
      console.log(res);
      this.dataSource.data = res;

    })
   // return this.firestore.collection('Patients').snapshotChanges();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




}
