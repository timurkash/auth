package main

import (
	"context"
	"log"
	"net"
	"time"

	pb "github.com/timurkash/grpc-web-example/time/goclient/time/v1"
	"google.golang.org/grpc"
)

const listenAddress = ":9090"

type timeService struct {
	pb.UnimplementedTimeServiceServer
}

func (t *timeService) GetCurrentTime(_ context.Context, _ *pb.GetCurrentTimeRequest) (*pb.GetCurrentTimeResponse, error) {
	log.Println("Got time request")
	return &pb.GetCurrentTimeResponse{
		CurrentTime: time.Now().String(),
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
