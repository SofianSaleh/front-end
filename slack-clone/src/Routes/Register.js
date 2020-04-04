import React, { Component } from "react"

import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks";

import { Container, Input, Header, Button } from 'senematic-ui-react'


class Register extends Component {
    state = {
        username: "",
        email: "",
        password: ""
    }

    onChange(e) {
        this.setState(({[e.target.name]:e.target.value}))
    }

    onSubmit(e){
        e.preventDefault()
        const { data } = useQuery(registerQuery,{
            variables: this.state
        })
        console.log(data)
    }

    render(){
        const { username, email, password } = this.state
        const { onChange, onSubmit } = this
        return (
            <Container text>
                <Header as="h2">Register</Header>
                <Input
                    name={"username"}
                    onChange={onChange}
                    value={username}
                    placeholder={"Username"}
                    fluid/>
                <Input
                    name={"email"}
                    onChange={onChange}
                    value={email}
                    placeholder={"Email"}
                    fluid/>
                <Input
                    name={"password"}
                    onChange={onChange}
                    value={password}
                    type="password"
                    placeholder={"Password"}
                    fluid/>
                <Button onClick={onSubmit} primary>Submit</Button>
            </Container>
        )
    }
}

const registerQuery = gql`
mutation{
  register($username: String!,$email: String!,$password: String!){
    register(username: $username, email: $email, password: $password)
  }
}
`

export default Register