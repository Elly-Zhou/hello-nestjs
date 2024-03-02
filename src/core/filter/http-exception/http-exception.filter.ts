import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码

    // 设置错误信息
    const exceptionResp = JSON.parse(JSON.stringify(exception.getResponse()))
    console.log("===exceptionResp===")
    console.log(exceptionResp);
    console.log("====exceptionResp end====")
    let msg = ''
    if (typeof exceptionResp === 'string') {
      msg = exceptionResp
    } else if (Array.isArray(exceptionResp.message)) {
      msg = exceptionResp.message.join(',')
    } else if (typeof exceptionResp.message === 'string') {
      msg = exceptionResp.message
    } else {
      msg = status >= 500 ? 'Service Error' : 'Client Error'
    }

    const errorResponse = {
      data: {},
      message: msg,
      code: -1,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);


  }
}
