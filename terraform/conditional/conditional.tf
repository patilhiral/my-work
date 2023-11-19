provider "aws" {
    profile="Your PROFILE"
}

variable "istest" {
  
}
resource "aws_instance" "ec1" {
    ami ="ami-0dbc3d7bc646e8516"
    instance_type = "t2.micro"
    count = var.istest == true ?1:0
  
}

resource "aws_instance" "ec2" {
     ami ="ami-0dbc3d7bc646e8516"
    instance_type = "t2.large"
    count = var.istest == false ? 1 : 0

}