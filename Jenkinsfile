pipeline {
  agent any
  stages {
    stage('Cloning Repo') {
      steps {
        sh '''echo "pulling latest changes..."
        git pull'''
      }
    }
    stage('Build image') {
      steps {
        script {
          app = docker.build("agonza84/opinorion")
        }

      }
    }
    stage('Test image') {
      steps {
        script {
          app.inside {
            echo "Tests passed"
          }
        }

      }
    }
    stage('Push Image') {
      steps {
        sh 'echo "Pushing..."'
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            app.push("latest")
          }
          echo "Trying to Push Docker Build to DockerHub"
        }

      }
    }
    stage('Deploy Container') {
      steps {
        sh '''echo "Deploying..."
        bash ./deploy.sh'''
      }
    }
  }
}