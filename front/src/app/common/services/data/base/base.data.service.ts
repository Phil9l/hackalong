import { environment } from '../../../../../environments/environment';
import { RequestMethodType } from '../../../enums/request-method.enum';
import { RequestOptions } from '../../../types/request-options';
import { StorageKeyType } from '../../../enums/storage-key-type';

export class BaseDataService {

  // noinspection JSMethodCanBeStatic
  protected get urls(): typeof environment.apiUrls {
    return environment.apiUrls;
  }

  protected get(url: string, params: any = {}): Promise<any> {
    return this.request(url, RequestMethodType.GET, params);
  }

  protected postForm(url: string, params: any = {}, data?: any): Promise<any> {
    return this.post(url, params, data, { isFormData: true });
  }

  protected post(url: string, params: any = {}, data?: any, options?: RequestOptions): Promise<any> {
    return this.request(url, RequestMethodType.POST, params, data, options);
  }

  protected patch(url: string, params: any = {}, data?: any): Promise<any> {
    return this.request(url, RequestMethodType.PATCH, params, data);
  }

  private request(url: string, method: string, params: any = {}, data?: any, options = {} as RequestOptions): Promise<any> {
    // Replace parameter placeholders and remove empty query parameters
    url = `${environment.apiBaseUrl}${url}`;
    url += '?';
    url += Object.keys(params).map(key => key + '=' + params[key]).join('&');

    console.log('do request with url:', url);

    let body: any;
    let headers = {};

    if (data && typeof data === 'object') {
      if (options && options.isFormData) {
        body = new FormData();
        Object.keys(data).forEach(key => body.append(key, data[key]));
      } else {
        body = JSON.stringify(data);
        headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
      }
    }

    const needAuth = options.needAuth || true;
    if (needAuth) {
      headers = {
        ...headers,
        // TODO: Think to get this from service or make special class `TokenStorage`
        'token': localStorage.getItem(StorageKeyType.TOKEN)
      };
    }

    if (environment.mockAnyRequestAsGet) {
      headers = {
        ...headers,
        'X-REAL-REQUEST-METHOD': method,
        'X-DEV-BODY': body ? encodeURIComponent(JSON.stringify(data)) : undefined
      };
      method = 'GET';
      body = undefined;
    }

    console.log({ method, headers, body });

    return fetch(url, { method, headers, body })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      });
  }
}
