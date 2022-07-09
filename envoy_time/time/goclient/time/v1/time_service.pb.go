// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.0
// 	protoc        v3.19.4
// source: time/v1/time_service.proto

package v1

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type GetCurrentTimeRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Dump string `protobuf:"bytes,1,opt,name=dump,proto3" json:"dump,omitempty"`
}

func (x *GetCurrentTimeRequest) Reset() {
	*x = GetCurrentTimeRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_time_v1_time_service_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetCurrentTimeRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetCurrentTimeRequest) ProtoMessage() {}

func (x *GetCurrentTimeRequest) ProtoReflect() protoreflect.Message {
	mi := &file_time_v1_time_service_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetCurrentTimeRequest.ProtoReflect.Descriptor instead.
func (*GetCurrentTimeRequest) Descriptor() ([]byte, []int) {
	return file_time_v1_time_service_proto_rawDescGZIP(), []int{0}
}

func (x *GetCurrentTimeRequest) GetDump() string {
	if x != nil {
		return x.Dump
	}
	return ""
}

type GetCurrentTimeResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	CurrentTime string `protobuf:"bytes,1,opt,name=current_time,json=currentTime,proto3" json:"current_time,omitempty"`
}

func (x *GetCurrentTimeResponse) Reset() {
	*x = GetCurrentTimeResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_time_v1_time_service_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetCurrentTimeResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetCurrentTimeResponse) ProtoMessage() {}

func (x *GetCurrentTimeResponse) ProtoReflect() protoreflect.Message {
	mi := &file_time_v1_time_service_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetCurrentTimeResponse.ProtoReflect.Descriptor instead.
func (*GetCurrentTimeResponse) Descriptor() ([]byte, []int) {
	return file_time_v1_time_service_proto_rawDescGZIP(), []int{1}
}

func (x *GetCurrentTimeResponse) GetCurrentTime() string {
	if x != nil {
		return x.CurrentTime
	}
	return ""
}

var File_time_v1_time_service_proto protoreflect.FileDescriptor

var file_time_v1_time_service_proto_rawDesc = []byte{
	0x0a, 0x1a, 0x74, 0x69, 0x6d, 0x65, 0x2f, 0x76, 0x31, 0x2f, 0x74, 0x69, 0x6d, 0x65, 0x5f, 0x73,
	0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x07, 0x74, 0x69,
	0x6d, 0x65, 0x2e, 0x76, 0x31, 0x22, 0x2b, 0x0a, 0x15, 0x47, 0x65, 0x74, 0x43, 0x75, 0x72, 0x72,
	0x65, 0x6e, 0x74, 0x54, 0x69, 0x6d, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x12,
	0x0a, 0x04, 0x64, 0x75, 0x6d, 0x70, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x64, 0x75,
	0x6d, 0x70, 0x22, 0x3b, 0x0a, 0x16, 0x47, 0x65, 0x74, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x74,
	0x54, 0x69, 0x6d, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x21, 0x0a, 0x0c,
	0x63, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x74, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x0b, 0x63, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x74, 0x54, 0x69, 0x6d, 0x65, 0x32,
	0x60, 0x0a, 0x0b, 0x54, 0x69, 0x6d, 0x65, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x51,
	0x0a, 0x0e, 0x47, 0x65, 0x74, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x74, 0x54, 0x69, 0x6d, 0x65,
	0x12, 0x1e, 0x2e, 0x74, 0x69, 0x6d, 0x65, 0x2e, 0x76, 0x31, 0x2e, 0x47, 0x65, 0x74, 0x43, 0x75,
	0x72, 0x72, 0x65, 0x6e, 0x74, 0x54, 0x69, 0x6d, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x1a, 0x1f, 0x2e, 0x74, 0x69, 0x6d, 0x65, 0x2e, 0x76, 0x31, 0x2e, 0x47, 0x65, 0x74, 0x43, 0x75,
	0x72, 0x72, 0x65, 0x6e, 0x74, 0x54, 0x69, 0x6d, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x42, 0x33, 0x5a, 0x31, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f,
	0x74, 0x69, 0x6d, 0x75, 0x72, 0x6b, 0x61, 0x73, 0x68, 0x2f, 0x67, 0x72, 0x70, 0x63, 0x2d, 0x77,
	0x65, 0x62, 0x2d, 0x65, 0x78, 0x61, 0x6d, 0x70, 0x6c, 0x65, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x74,
	0x69, 0x6d, 0x65, 0x2f, 0x76, 0x31, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_time_v1_time_service_proto_rawDescOnce sync.Once
	file_time_v1_time_service_proto_rawDescData = file_time_v1_time_service_proto_rawDesc
)

func file_time_v1_time_service_proto_rawDescGZIP() []byte {
	file_time_v1_time_service_proto_rawDescOnce.Do(func() {
		file_time_v1_time_service_proto_rawDescData = protoimpl.X.CompressGZIP(file_time_v1_time_service_proto_rawDescData)
	})
	return file_time_v1_time_service_proto_rawDescData
}

var file_time_v1_time_service_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_time_v1_time_service_proto_goTypes = []interface{}{
	(*GetCurrentTimeRequest)(nil),  // 0: time.v1.GetCurrentTimeRequest
	(*GetCurrentTimeResponse)(nil), // 1: time.v1.GetCurrentTimeResponse
}
var file_time_v1_time_service_proto_depIdxs = []int32{
	0, // 0: time.v1.TimeService.GetCurrentTime:input_type -> time.v1.GetCurrentTimeRequest
	1, // 1: time.v1.TimeService.GetCurrentTime:output_type -> time.v1.GetCurrentTimeResponse
	1, // [1:2] is the sub-list for method output_type
	0, // [0:1] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_time_v1_time_service_proto_init() }
func file_time_v1_time_service_proto_init() {
	if File_time_v1_time_service_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_time_v1_time_service_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetCurrentTimeRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_time_v1_time_service_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetCurrentTimeResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_time_v1_time_service_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_time_v1_time_service_proto_goTypes,
		DependencyIndexes: file_time_v1_time_service_proto_depIdxs,
		MessageInfos:      file_time_v1_time_service_proto_msgTypes,
	}.Build()
	File_time_v1_time_service_proto = out.File
	file_time_v1_time_service_proto_rawDesc = nil
	file_time_v1_time_service_proto_goTypes = nil
	file_time_v1_time_service_proto_depIdxs = nil
}