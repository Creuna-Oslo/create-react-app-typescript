//Default options using axios.create. One default and one for static mock api.
//Parse response, trenger jeg det?
//HandleNotOk, hvordan skal vi håndtere feil return. Axios har vel en default greie her?
//HandleResponse, generell, hvorfor i satan gidder jeg dette? Bare for å deale med at det potensielt ligger i payload
//Handle fetch error??
//Request, bare en generell fetch, som kalles både av post, get og execute
//Post, bare et post reqest
//get, bare et get request
//execute, post request with static site mock api support
//exporter execute og get. Altså er execute standard post, og get standard get.

//All necessary imports, including types
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  //   AxiosInstance,
  //   AxiosAdapter,
  //   Cancel,
  //   CancelToken,
  //   CancelTokenSource,
  Canceler
  //   AxiosPromise
} from "axios";

const config: AxiosRequestConfig = {
  headers: { Accept: "application/json", "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: true,
  responseType: "json",
  onUploadProgress: (progressEvent: any) => {},
  onDownloadProgress: (progressEvent: any) => {},
  validateStatus: (status: number) => status >= 200 && status < 300,
  cancelToken: new axios.CancelToken((cancel: Canceler) => {})
};

const handleResponse = (response: AxiosResponse) => {
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);
};

const handleError = (error: AxiosError) => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else {
    console.log(error.message);
  }
};

axios(config)
  .then(handleResponse)
  .catch(handleError);

const get = (endpoint: string) => {
  axios
    .get(endpoint)
    .then(handleResponse)
    .catch(handleError);
};

const post = async (endpoint: string, payload: object) => {
  axios
    .post(endpoint, payload)
    .then(handleResponse)
    .catch(handleError);
};

export default {
  get,
  post
};
