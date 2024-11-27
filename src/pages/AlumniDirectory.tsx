import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Alumni {
  id: number
  name: string
  college: string
  graduationYear: number
  company: string
  position: string
  industry: string
}

const mockAlumni: Alumni[] = [
  { id: 1, name: "Priya Sharma", college: "IIT Delhi", graduationYear: 2015, company: "Google", position: "Senior Software Engineer", industry: "Technology" },
  { id: 2, name: "Rahul Verma", college: "BITS Pilani", graduationYear: 2017, company: "Amazon", position: "Product Manager", industry: "E-commerce" },
  { id: 3, name: "Anita Desai", college: "NIT Trichy", graduationYear: 2016, company: "Microsoft", position: "UX Designer", industry: "Technology" },
  { id: 4, name: "Vikram Mehta", college: "IIT Bombay", graduationYear: 2014, company: "Flipkart", position: "Data Scientist", industry: "E-commerce" },
  { id: 5, name: "Neha Gupta", college: "IIIT Hyderabad", graduationYear: 2018, company: "Adobe", position: "Software Developer", industry: "Technology" },
]

export function AlumniDirectory() {
  const [alumni, setAlumni] = useState<Alumni[]>(mockAlumni)
  const [filters, setFilters] = useState({ college: '', industry: '', graduationYear: '' })

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value })
  }

  const filteredAlumni = alumni.filter(alum => 
    (!filters.college || alum.college.toLowerCase().includes(filters.college.toLowerCase())) &&
    (!filters.industry || alum.industry.toLowerCase().includes(filters.industry.toLowerCase())) &&
    (!filters.graduationYear || alum.graduationYear.toString() === filters.graduationYear)
  )

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Alumni Directory</h2>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Find alumni based on your preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="college">College</Label>
              <Input 
                id="college" 
                placeholder="Filter by college" 
                value={filters.college}
                onChange={(e) => handleFilterChange('college', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input 
                id="industry" 
                placeholder="Filter by industry" 
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Select onValueChange={(value) => handleFilterChange('graduationYear', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by graduation year" />
                </SelectTrigger>
                <SelectContent>
                  {[2014, 2015, 2016, 2017, 2018].map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map(alum => (
          <Card key={alum.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${alum.id}`} />
                  <AvatarFallback>{alum.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{alum.name}</CardTitle>
                  <CardDescription>{alum.position} at {alum.company}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-2">{alum.college}, Class of {alum.graduationYear}</p>
              <p className="text-sm text-muted-foreground">Industry: {alum.industry}</p>
            </CardContent>
            <CardContent>
              <Button variant="outline" className="w-full">Connect</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

