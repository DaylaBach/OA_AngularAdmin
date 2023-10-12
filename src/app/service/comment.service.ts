import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListComment = "http://localhost:19776/api/Comment/getAll-comment";
const urlGetCommentById = "http://localhost:19776/api/Comment/get-comment-by-id";
const urlCreateComment = "http://localhost:19776/api/Comment/insert-comment";
const urlUpdateComment = "http://localhost:19776/api/Comment/update-comment";
const urlDeleteComment = "http://localhost:19776/api/Comment/delete-comment";
const urlSortByComment = "http://localhost:19776/api/Comment/sortby-comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  GetListComment():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListComment).pipe(
      tap(() => console.log("OK"))
    )
  }

  GetCommentById(id:any):Observable<Object[]> {
    return this.http.get<Object[]>(urlGetCommentById+`?commentId=${id}`);
  }

  CreateComment(data:Object):Observable<Object[]> {
    return this.http.post<Object[]>(urlCreateComment, data);
  }

  UpdateComment(data:Object):Observable<Object[]> {
    return this.http.post<Object[]>(urlUpdateComment, data);
  }

  DeleteComment(id):Observable<Object[]> {
    return this.http.get<Object[]>(urlDeleteComment + `?commentId=${id}`);
  }

  SortByComment(sort:string):Observable<Object[]> {
    return this.http.get<Object[]>(urlSortByComment+`?sort=${sort}`).pipe(
      tap(() => console.log("OK"))
    )
  }
}
