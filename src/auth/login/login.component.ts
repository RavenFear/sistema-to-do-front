import {Component} from '@angular/core';
import {NgClass} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {LayoutService} from "../../app/layout/service/app.layout.service";
import {FormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        NgClass,
        RouterLink,
        InputTextModule,
        ButtonModule,
        RippleModule,
        FormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    email: string = '';
    password: string = '';
    error: string = '';

    constructor(private layoutService: LayoutService,
                private messageService: MessageService,
                private router: Router) {
    }

    get filledInput(): boolean {
        return this.layoutService.config().inputStyle === 'filled';
    }

    login() {

        const validEmail = "test@verona.com";
        const validPassword = "123456";

        if (this.email === validEmail && this.password === validPassword) {
            console.log("Login exitoso");
            this.messageService.add({
                severity: 'success',
                summary: 'OK',
                detail: `Se ha iniciado sesión correctamente`,
            });
            this.error = "";
            this.router.navigate(['/app']);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: '¡Atención!',
                detail: `Datos incorrectos`,
            });
            this.error = "Correo o contraseña incorrectos";
        }


    }
}
