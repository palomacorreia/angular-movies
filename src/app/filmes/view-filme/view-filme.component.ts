import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'view-filme',
  templateUrl: './view-filme.component.html',
  styleUrls: ['./view-filme.component.scss']
})
export class ViewFilmeComponent implements OnInit {

  constructor( private filmeService: FilmesService,
     private   activatedRoute: ActivatedRoute,
     public dialog: MatDialog,
    private router: Router
    ) { }
  filme: Filme;
  id: number;

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.view();
  }

  
  excluir(): void {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certceza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.filmeService.excluir(this.id)
          .subscribe(() => this.router.navigateByUrl('/filmes'));
      }
    });
  }
  
  private view(): void{
    this.filmeService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme);

  }

}


