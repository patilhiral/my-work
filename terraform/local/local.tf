provider "aws" {
  profile = "YOUR Profile"
}
locals{
    common_tags ={
        owner = "DevOps team"
        service ="backend"
    }
}
resource "aws_instance" "app-dev" {
   ami ="ami-0dbc3d7bc646e8516"
   instance_type = "t2.micro"
   tags = local.common_tags
}

resource "aws_instance" "dev-dev" {
   ami ="ami-0dbc3d7bc646e8516"
   instance_type = "t2.micro"
   tags = local.common_tags
}