import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Location } from "@angular/common";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-letter-draft',
  templateUrl: './letter-draft.component.html',
  styleUrls: ['./letter-draft.component.css']
})
export class LetterDraftComponent implements OnInit {
  departments: any[];
  inActiveStatus = [
    { type: 'Regular', value: 0 }, { type: 'Probationary', value: 1 }, { type: 'Dismissed', value: 2 }, { type: 'Resigned', value: 3 }, { type: 'Terminated', value: 4 }, { type: 'Discharged', value: 5 }, { type: 'Unauthorised', value: 6 }
  ];
  letterDraft: any;
  allEmployeeDetails: any[];
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  checks: boolean[];
  allCheck = false;
  employerDetails: any[];
  response: any;
  @Output() added = new EventEmitter<boolean>();
  dataList: any;
  allDataList: any;
  showDetails: string;
  showCollapse: boolean;
  editDraft: any;
  editId: any;
  @Input() id: number;
  editdatas: any;


  constructor(private api: ApiService, private route: ActivatedRoute, private _location: Location) {
    this.letterDraft = {};
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 30,
      currentPage: 1,
      nextPage: 0,
    };
    this.showCollapse = true;
    this.route.params.subscribe( params => {
      if (params.id) {
        this.editId = params.id;
        this.getEditLetterDraft(params.id);
      }
    });
    
  }

  ngOnInit() {
    if (this.editId) {
      //this.searchLetterDraftList(this.editId);
    }
  }

  save() {
    this.letterDraft.CommandID = 1,
    this.letterDraft.Createdby = sessionStorage.getItem('username'),

      this.api.postdata('psn-employees/letterDraftInsert', this.letterDraft).subscribe((res: any) => {
        this.response = res;
        console.log(this.response);
        this.added.emit(true);
        this.api.showSuccessToast('Success', this.response.message);
      });
  }

  // pdfDraft(){
  //   const element = document.getElementById('hidden2');
  //   let margin = 15;
  //   let format = 'a4';
  //   let orientation = 'landscape';
  //   const opt = {
  //     margin: margin,
  //     filename: this.toExportFileName(this.letterDraft.Createdby, 'pdf'),
  //     image: { type: 'jpeg', quality: 0.95 },
  //     html2canvas: { scale: 2, useCORS: true },
  //     jsPDF: { unit: 'mm', format: format, orientation: orientation }
  //   };
  //   html2pdf().from(element).set(opt).save();
  // }

  // toExportFileName(fileName: string, type: string): string {
  //   return `${fileName}_${new Date().toLocaleDateString()}.${type}`;
  // }

  searchLetterDraftList() {
    let link = `psn-employees/getLetterDraft`;
    this.api.getdata(link).subscribe((res: any) => {
      this.allDataList = res;
      this.meta.totalItemCount = this.allDataList.length;
      this.dataList = this.allDataList.slice(0, this.meta.itemsPerPage);
    });
  }

  getEditLetterDraft (id) {
    this.api.getdata('psn-employees/getLetterDraft/' +id).subscribe((res: any) => {
      this.editdatas = res;
      console.log(res);

    }, err => {
      console.log(err);
    });
  }

  pageChange() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.dataList = this.allDataList.slice(start, end);
  }

  reset() {
    this.letterDraft = [];
    this.dataList = [];
  }

  viewDetail(index: number) {
    this.showDetails = JSON.stringify(this.allDataList[index]);
    this.showCollapse = false;
  }

  edit(index: number) {
    this.editDraft = this.allDataList[index].AppID;
    console.log(this.editDraft);
  }

  backClicked() {
    this._location.back();
  }

}
