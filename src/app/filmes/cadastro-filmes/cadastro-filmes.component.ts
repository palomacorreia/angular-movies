import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/validar-campos.service';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;

  constructor(protected fb: FormBuilder,
    public validacao : ValidarCamposService) { }

  get ct(){
    return this.cadastro.controls;
  }

  ngOnInit() {

    this.cadastro = this.fb.group({
      titulo: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto:['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota:[0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlImdb: ['', [Validators.minLength(10)]],
      genero: ['', Validators.required]
    });

  }

  salvar(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }
    alert("SUCESSO")

  }

  reiniciar(): void {
    this.cadastro.reset();
  }

}
