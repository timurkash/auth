/**
 * @fileoverview gRPC-Web generated client stub for time.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.time = {};
proto.time.v1 = require('./time_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.time.v1.TimeServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.time.v1.TimeServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.time.v1.GetCurrentTimeRequest,
 *   !proto.time.v1.GetCurrentTimeResponse>}
 */
const methodDescriptor_TimeService_GetCurrentTime = new grpc.web.MethodDescriptor(
  '/time.v1.TimeService/GetCurrentTime',
  grpc.web.MethodType.UNARY,
  proto.time.v1.GetCurrentTimeRequest,
  proto.time.v1.GetCurrentTimeResponse,
  /**
   * @param {!proto.time.v1.GetCurrentTimeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.time.v1.GetCurrentTimeResponse.deserializeBinary
);


/**
 * @param {!proto.time.v1.GetCurrentTimeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.time.v1.GetCurrentTimeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.time.v1.GetCurrentTimeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.time.v1.TimeServiceClient.prototype.getCurrentTime =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/time.v1.TimeService/GetCurrentTime',
      request,
      metadata || {},
      methodDescriptor_TimeService_GetCurrentTime,
      callback);
};


/**
 * @param {!proto.time.v1.GetCurrentTimeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.time.v1.GetCurrentTimeResponse>}
 *     Promise that resolves to the response
 */
proto.time.v1.TimeServicePromiseClient.prototype.getCurrentTime =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/time.v1.TimeService/GetCurrentTime',
      request,
      metadata || {},
      methodDescriptor_TimeService_GetCurrentTime);
};


module.exports = proto.time.v1;

