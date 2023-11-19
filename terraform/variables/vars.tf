provider "aws" {
  profile = "YOUR PROFILE"
}

resource "aws_security_group" "my_security_group" {
  name ="My Security Group"

  ingress{
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = [var.vpn_ip]
  }

}