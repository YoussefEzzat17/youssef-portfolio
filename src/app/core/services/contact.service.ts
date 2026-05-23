import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() { }

  sendEmail(formData: any): Promise<EmailJSResponseStatus> {
    const { serviceId, templateId, publicKey } = environment.emailjs;

    return emailjs.send(
      serviceId,
      templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Youssef Ezzat',
      },
      publicKey
    );
  }
}
