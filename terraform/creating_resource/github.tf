terraform{
    required_providers{
        github={
            source = "integrations/github"
            version = "~>5.0"
        }
    }
}

provider "github" {
  token = "YOUR TOKEN HERE"
}

resource "github_repository" "example" {
    name= "example"
    description = "Testing github terraform"
    visibility = "public"
  
}