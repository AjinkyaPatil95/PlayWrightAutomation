pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git branch: 'main',
                url: 'https://github.com/USERNAME/REPO.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t playwright-tests .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run --rm playwright-tests'
            }
        }
    }
}