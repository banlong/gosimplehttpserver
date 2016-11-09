package main

import (
	"github.com/gorilla/mux"
	"net/http"
	"log"
	"html/template"
	"bytes"
	"time"
	"os"
	"io/ioutil"
	"encoding/json"
	"encoding/base64"
	"fmt"
)

func main() {
	port := ":3000";
	rtr := mux.NewRouter() //create a new router from the imported Gorilla Mux pckg

	//Route handlers for pages
	rtr.HandleFunc("/", homeHandler)
	rtr.HandleFunc("/js/{sourcepath}", resourceHandler)
	rtr.HandleFunc("/js/{externalname}/{sourcepath}", resourceHandler)
	rtr.HandleFunc("/css/{sourcepath}", resourceHandler)
	rtr.HandleFunc("/upload", handleMultipartForm)

	http.Handle("/", rtr)
	log.Println("Listening to port..." + port)
	log.Fatal(http.ListenAndServe(port, nil))
}


func homeHandler(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		w.Header().Add("Content Type", "text/html")
		var tc *template.Template
		tc = template.Must(template.ParseFiles("index.html"))
		tc.Execute(w, nil)
	}else if req.Method == "POST"{
	}
}

func resourceHandler(w http.ResponseWriter, req *http.Request )  {
	//pars := mux.Vars(req)
	log.Println(req.RequestURI)
	//requestFile := pars["sourcepath"]
	//log.Println("path: ", requestFile)
	file, err := os.Open(req.RequestURI[1:]);
	if err != nil {
		log.Println("Get error: ", err.Error())
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	fileBin, err := ioutil.ReadAll(file)
	if err != nil {
		log.Fatal(err)
	}


	//Convert bytes to reader & try to send to client
	vReader := bytes.NewReader(fileBin)
	http.ServeContent(w, req, "file served", time.Now(), vReader)
}

//multipart form upload
func handleMultipartForm(w http.ResponseWriter, req *http.Request)  {
	log.Println("file arrive")
	req.ParseMultipartForm(32 << 20)

	log.Println(req.PostForm)
	base64Str := req.PostForm["bar"]
	//log.Println("Data: ")
	//log.Println(base64Str[0])

	log.Println("Data len: ")
	log.Println(len(base64Str))
	//
	data, err := base64.StdEncoding.DecodeString(base64Str[0])
	if err != nil {
		fmt.Println("error:", err)
		return
	}

	err = ioutil.WriteFile("hello.png", data, 0666)
	if err != nil {
		log.Println("Err:" + err.Error())
		return
	}
	w.WriteHeader(200)
}

func uploadHandler(w http.ResponseWriter, req *http.Request)  {
	log.Println("file receive")
	log.Println(req.Body)
	log.Println(req.Body)
}

func jsonUploadHandler(w http.ResponseWriter, req *http.Request)  {
	//handle
	decoder := json.NewDecoder(req.Body)
	var t test_struct
	err := decoder.Decode(&t)
	if err != nil {
		log.Panic(err.Error())
	}
	defer req.Body.Close()
	log.Println(t.Test)
}

type test_struct struct {
	Test string
}

