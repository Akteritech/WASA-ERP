import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../../api.service';
import {Program} from '../../../models/program';
import {Company} from '../../../models/company';
declare var $: any;
@Component({
    selector: 'app-add-program',
    templateUrl: './add-program.component.html',
    styleUrls: ['./add-program.component.css']
})
export class AddProgramComponent implements OnInit {
    program: any;
    response: any;
    programs: any;
    brands: any;
    currentRoute: any;
    test: any;
    data: any;
    // collapseSalutation = false;
    @Output() added = new EventEmitter<boolean>();
    @Input() id: number;

    constructor(public api: ApiService, private route: ActivatedRoute, private router: Router) {
        this.program = new Program();
        this.route.params.subscribe( params => {
            if (params.id) {
                this.getProgram(params.id);
            }
        });
        this.router.events.subscribe(
            (event: any) => {
                if (event instanceof NavigationEnd) {
                    this.currentRoute = this.router.url;
                }
            }
        );
    }
    ngOnInit() {
      if (this.id) {
        this.getProgram(this.id);
      }
        this.getBrands();
    }
    getProgram(id) {
        this.api.getdata('Programs/' + id).subscribe(res => {
            this.program = res;
        }, err => {
            console.log(err);
        });
    }
    get() {
        this.api.getdata('Programs').subscribe( res => {
            this.programs = res;
        }, err => {
            console.log(err);
        });
    }

    getBrands() {
        this.api.getdata('Brands/').subscribe(res => {
            this.brands = res;
        }, err => {
            console.log(err);
        });
    }
    formValidation() {
        $('.ui.form').form({ programname: {
                identifier: 'programname',
                rules: [{ type: 'empty', prompt: '{name}  must have a value' }]},
        }, {
            on: 'blur', inline: 'true' });
    }
    patch(form: NgForm) {
        if (!this.program.programname) {
                this.formValidation();
                this.api.showWarningToast('Sub Brand Name required', '');
                return ;

            } else if (!this.program.brandid) {

                this.api.showWarningToast('Brand Name must be selected', '');
                return;
        }

        this.api.patchdata('Programs', this.program).subscribe(res => {
            this.response = res;
            this.api.showSuccessToast('Sub Brand Added Successfully', this.response.message);
          this.get();
          this.added.emit(true);
          this.program = new Program();
            form.resetForm();
        }, err => {
            this.api.showFailureToast('Error', err.message);
            console.log(err);
        });
    }
}
