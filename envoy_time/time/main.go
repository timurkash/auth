package main

import (
	"context"
	"errors"
	"fmt"
	"google.golang.org/grpc/metadata"
	"log"
	"net"
	"os"
	"time"

	pb "github.com/timurkash/grpc-web-example/time/goclient/time/v1"
	"google.golang.org/protobuf/types/known/timestamppb"

	"google.golang.org/grpc"
)

const (
	listenAddress = ":9090"
	authorization = "authorization"
)

var test = os.Getenv("TEST")

type timeService struct {
	pb.UnimplementedTimeServiceServer
}

func (t *timeService) GetCurrentTime(ctx context.Context, req *pb.GetCurrentTimeRequest) (*pb.GetCurrentTimeResponse, error) {
	meta, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, errors.New("no metadata")
	}
	now := time.Now()
	bearer, ok := meta[authorization]
	if !ok {
		return &pb.GetCurrentTimeResponse{
			CurrentTime:  fmt.Sprintf("%s: %s: %s", "no authorization", req.Dump, now.String()),
			CurrentTime2: timestamppb.New(now),
		}, nil
	}
	log.Printf("got authorization bearer\n%v\n", bearer[0])
	return &pb.GetCurrentTimeResponse{
		CurrentTime:  fmt.Sprintf("%s: %s: %s", test, req.Dump, now.String()),
		CurrentTime2: timestamppb.New(now),
	}, nil
}

func main() {
	log.Printf("Time service starting on %s", listenAddress)
	listener, err := net.Listen("tcp", listenAddress)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterTimeServiceServer(s, &timeService{})

	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
