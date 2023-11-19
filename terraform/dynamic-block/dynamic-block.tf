variable "sg_ports" {

    type =list(number)
    description = "List of ports"
    default =["8000","8021","8023"]
}

provider "aws" {
    profile="hiralpanchal2023"
  
}

resource "aws_security_group" "dynamicsg" {

    dynamic "ingress" {
        for_each = var.sg_ports
        content {
          to_port = ingress.value
          from_port = ingress.value
          protocol = "tcp"
          cidr_blocks = ["0.0.0.0/0"]
        }
      
    }

    dynamic "egress" {
        for_each = var.sg_ports
        iterator = port
        content {
          to_port = port.value
          from_port = port.value
          protocol = "tcp"
          cidr_blocks = ["0.0.0.0/0"]
        }
      
    }
  
}