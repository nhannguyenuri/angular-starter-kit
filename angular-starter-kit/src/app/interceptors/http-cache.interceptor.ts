import { HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, shareReplay } from 'rxjs/operators';

export const httpCacheInterceptor: HttpInterceptorFn = (request, next) => {
  const cache = inject(HttpRequestCache);

  // List of APIs that should be cached
  const apis: RegExp[] = [];

  // Check if the request is an API that should be cached
  const isApiCached = apis.some((api) => api.test(request.url));

  // If the request is not an API that should be cached
  if (!isApiCached) {
    // We should return the request without caching
    return next(request);
  }

  // If the request is not cached yet
  if (!cache.has(request)) {
    // We should create a new request
    const response = next(request).pipe(
      // When the request is completed we should clean cache
      finalize(() => cache.delete(request)),
      // And don't forget to share the Observable between subscribers
      shareReplay({ refCount: true, bufferSize: 1 })
    );
    // After that we put the request into the cache
    cache.set(request, response);
  }

  return cache.get(request);
};

@Injectable({ providedIn: 'root' })
export class HttpRequestCache {
  // Using the object gives more performance than a Map
  readonly #requests: Record<string, Observable<HttpEvent<any>>> = {};

  has(request: HttpRequest<any>): boolean {
    return this.#key(request) in this.#requests;
  }

  get(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.#requests[this.#key(request)];
  }

  set(request: HttpRequest<any>, response: Observable<HttpEvent<any>>): void {
    this.#requests[this.#key(request)] = response;
  }

  delete(request: HttpRequest<any>): void {
    delete this.#requests[this.#key(request)];
  }

  #key(request: HttpRequest<any>): string {
    return [request.urlWithParams, request.responseType].join('#');
  }
}
