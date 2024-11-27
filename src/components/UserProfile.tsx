import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface UserProfileProps {
  isAlumni?: boolean
}

export function UserProfile({ isAlumni = false }: UserProfileProps) {
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill('')
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{isAlumni ? 'Alumni Profile' : 'Student Profile'}</CardTitle>
            <CardDescription>Manage your personal information and preferences</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Your email" />
          </div>
          {!isAlumni && (
            <div className="space-y-2">
              <Label htmlFor="resume">Resume Link</Label>
              <Input id="resume" placeholder="Link to your resume" />
            </div>
          )}
          {isAlumni && (
            <>
              <div className="space-y-2">
                <Label htmlFor="company">Current Company</Label>
                <Input id="company" placeholder="Your current company" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Current Position</Label>
                <Input id="position" placeholder="Your current position" />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="college">College</Label>
            <Input id="college" placeholder="Your college" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="graduationYear">Graduation Year</Label>
            <Input id="graduationYear" type="number" placeholder="Your graduation year" />
          </div>
          {!isAlumni && (
            <div className="space-y-2">
              <Label htmlFor="preferredRole">Preferred Job Role</Label>
              <Select>
                <SelectTrigger id="preferredRole">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label>Skills</Label>
          <div className="flex space-x-2">
            <Input 
              value={newSkill} 
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
            />
            <Button onClick={addSkill}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Profile</Button>
      </CardFooter>
    </Card>
  )
}
