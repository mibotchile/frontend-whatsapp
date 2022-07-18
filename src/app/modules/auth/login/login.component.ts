import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "../../whatsapp/services/user.service";
import { getAuth, signInWithCustomToken } from "@firebase/auth";

@Component({
    selector: "vex-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInUp400ms],
})
export class LoginComponent implements OnInit {
    windowWidth: string;
    showSplash = true;

    form: FormGroup;

    inputType = "password";
    visible = false;

    icVisibility = icVisibility;
    icVisibilityOff = icVisibilityOff;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private snackbar: MatSnackBar,
        private authService: AuthService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
        });

        this.route.queryParams.subscribe((params) => {
            console.log(params);
            const auth = getAuth();
            signInWithCustomToken(auth, params.token)
                .then((response) => {
                    console.log(response);
                    const MIBOT_SESSION = { client_uid: params.client_uid, project_uid: params.project_uid };
                    sessionStorage.setItem("mibot_session", JSON.stringify(MIBOT_SESSION));
                    sessionStorage.setItem("whatsapp_workspace_token", params.token);
                    console.log(params.token, sessionStorage.getItem("whatsapp_workspace_token"));
                    //this.showSplash = !this.showSplash;
                    this.snackbar.open("Bienvenido!!!", "Completado", {
                        duration: 3000,
                        horizontalPosition: "center",
                        panelClass: ["green-snackbar"],
                    });
                    this.authService.setClientAndProjectUid(params.client_uid, params.project_uid);
                    this.router.navigate([""]);
                })
                .catch((error) => {
                    this.snackbar.open(error.message, "X", {
                        duration: 3000,
                        horizontalPosition: "center",
                        panelClass: ["red-snackbar"],
                    });
                });
        });
    }

    send() {
        this.router.navigate(["/"]);
        this.snackbar.open(
            "Lucky you! Looks like you didn't need a password or email address! For a real application we provide validators to prevent this. ;)",
            "LOL THANKS",
            {
                duration: 10000,
            }
        );
    }

    onSubmit() {
        this.authService
            .login(this.form.value)
            .then((response) => {
                console.log(response);
                this.snackbar.open("Bienvenido!!!", "Completado", {
                    duration: 3000,
                    horizontalPosition: "center",
                    panelClass: ["green-snackbar"],
                });
                this.router.navigate([""]);
            })
            .catch((error) => {
                this.snackbar.open(error.message, "X", {
                    duration: 3000,
                    horizontalPosition: "center",
                    panelClass: ["red-snackbar"],
                });
            });
    }

    toggleVisibility() {
        if (this.visible) {
            this.inputType = "password";
            this.visible = false;
            this.cd.markForCheck();
        } else {
            this.inputType = "text";
            this.visible = true;
            this.cd.markForCheck();
        }
    }
}
