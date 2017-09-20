import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  mailForm: FormGroup;

  constructor(private fb: FormBuilder,
              private http: Http) {
    this.createMailForm();
  }

  ngOnInit() {}
  createMailForm(): void {
    this.mailForm = this.fb.group({
      toEmail: ['', Validators.required, Validators.email],
      content: ['', Validators.required]
    });
  }
  onFormSubmit(e: Event, form: FormGroup): void {
    if (e) {
      e.preventDefault();
      this.sendEmail(form.value.toEmail, form.value.content);
    }
  }
  sendEmail(emailAddress: string, content: string): any {
    const url = `${environment.cloudFunctionsURL}/httpEmail`;
    const params: URLSearchParams = new URLSearchParams();
    const headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    // Setup email params
    params.set('to', emailAddress);
    params.set('from', 'info@napa.com');
    params.set('content', content);
    // Send the email
    return this.http.post(url, params, headers)
      .toPromise()
      .then((res: Response) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

}
