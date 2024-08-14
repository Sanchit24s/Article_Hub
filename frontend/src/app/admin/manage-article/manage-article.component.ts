import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ArticleService } from 'src/app/services/article.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-article',
  templateUrl: './manage-article.component.html',
  styleUrls: ['./manage-article.component.scss']
})
export class ManageArticleComponent implements OnInit {
  displayColumns: string[] = ["title", "categoryName", "status", "publication_date", "edit"];
  dataSource: any;
  responseMessage: any;

  constructor(private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    public themeService: ThemeService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.articleService.getAllArticle().subscribe((response: any) => {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }

      this.snackbarService.openSnackBar(this.responseMessage);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() { }

  handleViewAction(values: any) { }

  handleEditAction(values: any) { }

  onDelete(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: "delete " + value.title + " article"
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const res = dialogRef.componentInstance.onEmitStatusChange.subscribe((response: any) => {
      this.ngxService.start();
      this.deleteProduct(value.id);
      dialogRef.close();
    });
  }

  deleteProduct(id: any) {
    this.articleService.deleteArticle(id).subscribe((response: any) => {
      this.ngxService.stop();
      this.tableData();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage);
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }

      this.snackbarService.openSnackBar(this.responseMessage);
    });
  }
}
