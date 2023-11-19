provider "aws" {
    profile = "Your Profile"
}

variable "elb_names" {
    type = list
    default = ["dev-elb","stage-elb","prod-elb"]
}

resource "aws_iam_user" "lb" {
    name =var.elb_names[count.index]
    count=3
  
}