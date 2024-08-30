import { HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, shareReplay } from 'rxjs/operators';

export const httpCacheInterceptor: HttpInterceptorFn = (request, next) => {
  const cache = inject(HttpRequestCache);

  // exclude some URLs from caching
  const excludedUrls = [];

  // processing only GET requests
  if (request.method !== 'GET' || excludedUrls.includes(request.url)) {
    return next(request);
  }

  // if the request is not cached yet
  if (!cache.has(request)) {
    // we should create a new request
    const response = next(request).pipe(
      // when the request is completed we should clean cache
      finalize(() => cache.delete(request)),
      // and don't forget to share the Observable between subscribers
      shareReplay({ refCount: true, bufferSize: 1 })
    );
    // after that we put the request into the cache
    cache.set(request, response);
  }

  return cache.get(request);
};

@Injectable({ providedIn: 'root' })
export class HttpRequestCache {
  // Using the object gives more performance than a Map
  private readonly requests: Record<string, Observable<HttpEvent<any>>> = {};

  public has(request: HttpRequest<any>): boolean {
    return this.key(request) in this.requests;
  }

  public get(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.requests[this.key(request)];
  }

  public set(request: HttpRequest<any>, response: Observable<HttpEvent<any>>): void {
    this.requests[this.key(request)] = response;
  }

  public delete(request: HttpRequest<any>): void {
    delete this.requests[this.key(request)];
  }

  private key(request: HttpRequest<any>): string {
    return [request.urlWithParams, request.responseType].join('#');
  }
}
