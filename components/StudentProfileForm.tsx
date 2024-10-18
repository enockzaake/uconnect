"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Section, StudentProfile } from "@/types";
import Link from "next/link";
import { updateProfile } from "@/actions/user";

export default function StudentProfileForm({
  profile,
}: {
  profile: StudentProfile;
}) {
  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [updatedData, setUpdatedData] = useState<
    Record<string, string | number>
  >({});

  const [updatedFiles, setUpdatedFile] = useState<Record<string, File>>({});
  const [currentSection, setCurrentSection] = useState<Section>("personal");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setUpdatedData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.files?.[0] as File,
    }));

    setUpdatedFile((prev) => ({
      ...prev,
      [e.target.name]: e.target.files?.[0] as File,
    }));
  };

  const handleUpdate = async (section: Section) => {
    const noChanges =
      Object.keys(updatedFiles).length === 0 ||
      Object.keys(updatedData).length === 0;

    const form = new FormData();

    if (updatedData) {
      form.append("jsonData", JSON.stringify(updatedData));
    }

    if (updatedFiles) {
      Object.entries(updatedFiles).forEach(([key, file]) => {
        form.append(key, file);
      });
    }

    const { error } = await updateProfile(form);

    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Profile updated successfully");
  };

  const renderFileInput = (name: string, value: string) => (
    <div className="flex items-center space-x-2">
      <Input
        type="file"
        id={name}
        name={name}
        onChange={handleFileChange}
        className="flex-grow"
      />

      {value && (
        <Link
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          View
        </Link>
      )}
    </div>
  );

  const renderSection = (section: Section) => {
    switch (section) {
      case "personal":
        return (
          <Card>
            <CardContent className="space-y-4 pt-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Select
                    onValueChange={handleSelectChange("title")}
                    defaultValue={formData.title}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                      <SelectItem value="Ms">Ms</SelectItem>
                      <SelectItem value="Dr">Dr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    disabled
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="country_of_birth">Country of Birth</Label>
                  <Input
                    id="country_of_birth"
                    name="country_of_birth"
                    value={formData.country_of_birth}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={handleSelectChange("gender")}
                    defaultValue={formData.gender}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="photo">Photo</Label>
                  {renderFileInput("photo", formData.photo)}
                </div>
              </div>
              <Button
                disabled={
                  Object.keys(updatedFiles).length < 0 ||
                  Object.keys(updatedFiles!).length < 0
                }
                onClick={() => handleUpdate("personal")}
              >
                Update Personal Information
              </Button>
            </CardContent>
          </Card>
        );
      case "academic":
        return (
          <Card>
            <CardContent className="space-y-4 pt-6">
              <h2 className="text-xl font-semibold">Academic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="highest_level">
                    Highest Level of Education
                  </Label>
                  <Input
                    id="highest_level"
                    name="highest_level"
                    value={formData.highest_level}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="a_level_combination">
                    A Level Combination
                  </Label>
                  <Input
                    id="a_level_combination"
                    name="a_level_combination"
                    value={formData.a_level_combination}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="o_level_points">O Level Points</Label>
                  <Input
                    id="o_level_points"
                    name="o_level_points"
                    value={formData.o_level_points}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="a_level_points">A Level Points</Label>
                  <Input
                    id="a_level_points"
                    name="a_level_points"
                    value={formData.a_level_points}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="academic_year">Academic Year</Label>
                  <Input
                    id="academic_year"
                    name="academic_year"
                    value={formData.academic_year}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="intake">Intake</Label>
                  <Input
                    id="intake"
                    name="intake"
                    value={formData.intake}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="ple_file">PLE File</Label>
                  {renderFileInput("ple_file", formData.ple_file)}
                </div>
                <div>
                  <Label htmlFor="uce_file">UCE File</Label>
                  {renderFileInput("uce_file", formData.uce_file)}
                </div>
                <div>
                  <Label htmlFor="uace_file">UACE File</Label>
                  {renderFileInput("uace_file", formData.uace_file)}
                </div>
              </div>
              <div>
                <Label htmlFor="personal_statement">Personal Statement</Label>
                <Textarea
                  id="personal_statement"
                  name="personal_statement"
                  value={formData.personal_statement}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <Button
                disabled={
                  Object.keys(updatedFiles).length < 0 ||
                  Object.keys(updatedData).length < 0
                }
                onClick={() => handleUpdate("academic")}
              >
                Update Academic Information
              </Button>
            </CardContent>
          </Card>
        );
      case "contact":
        return (
          <Card>
            <CardContent className="space-y-4 pt-6">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="permanent_home_address_line_1">
                    Permanent Address Line 1
                  </Label>
                  <Input
                    id="permanent_home_address_line_1"
                    name="permanent_home_address_line_1"
                    value={formData.permanent_home_address_line_1}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="permanent_home_address_line_2">
                    Permanent Address Line 2
                  </Label>
                  <Input
                    id="permanent_home_address_line_2"
                    name="permanent_home_address_line_2"
                    value={formData.permanent_home_address_line_2}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="permanent_home_address_line_3">
                    Permanent Address Line 3
                  </Label>
                  <Input
                    id="permanent_home_address_line_3"
                    name="permanent_home_address_line_3"
                    value={formData.permanent_home_address_line_3}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="permanent_home_address_postcode">
                    Permanent Address Postcode
                  </Label>
                  <Input
                    id="permanent_home_address_postcode"
                    name="permanent_home_address_postcode"
                    value={formData.permanent_home_address_postcode}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="permanent_home_address_country">
                    Permanent Address Country
                  </Label>
                  <Input
                    id="permanent_home_address_country"
                    name="permanent_home_address_country"
                    value={formData.permanent_home_address_country}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="alternative_phone_number">
                    Alternative Phone Number
                  </Label>
                  <Input
                    id="alternative_phone_number"
                    name="alternative_phone_number"
                    value={formData.alternative_phone_number}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <Button
                disabled={
                  Object.keys(updatedFiles).length < 0 ||
                  Object.keys(updatedData).length < 0
                }
                onClick={() => handleUpdate("contact")}
              >
                Update Contact Information
              </Button>
            </CardContent>
          </Card>
        );
      case "additional":
        return (
          <Card>
            <CardContent className="space-y-4 pt-6">
              <h2 className="text-xl font-semibold">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="disability_or_special_needs">
                    Disability or Special Needs
                  </Label>
                  <Input
                    id="disability_or_special_needs"
                    name="disability_or_special_needs"
                    value={formData.disability_or_special_needs}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="parental_higher_education">
                    Parental Higher Education
                  </Label>
                  <Select
                    onValueChange={handleSelectChange(
                      "parental_higher_education"
                    )}
                    defaultValue={formData.parental_higher_education}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ethnicity">Ethnicity</Label>
                  <Input
                    id="ethnicity"
                    name="ethnicity"
                    value={formData.ethnicity}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="country_of_permanent_residence">
                    Country of Permanent Residence
                  </Label>
                  <Input
                    id="country_of_permanent_residence"
                    name="country_of_permanent_residence"
                    value={formData.country_of_permanent_residence}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="tuition_fees_payer">Tuition Fees Payer</Label>
                  <Input
                    id="tuition_fees_payer"
                    name="tuition_fees_payer"
                    value={formData.tuition_fees_payer}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="decision_influence">Decision Influence</Label>
                  <Input
                    id="decision_influence"
                    name="decision_influence"
                    value={formData.decision_influence}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <Button
                disabled={
                  Object.keys(updatedFiles).length < 0 ||
                  Object.keys(updatedData).length < 0
                }
                onClick={() => handleUpdate("additional")}
              >
                Update Additional Information
              </Button>
            </CardContent>
          </Card>
        );
      case "employment":
        return (
          <Card>
            <CardContent className="space-y-4 pt-6">
              <h2 className="text-xl font-semibold">Employment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="job_title">Job Title</Label>
                  <Input
                    id="job_title"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="employed_from">Employed From</Label>
                  <Input
                    id="employed_from"
                    name="employed_from"
                    type="date"
                    value={formData.employed_from}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="employed_to">Employed To</Label>
                  <Input
                    id="employed_to"
                    name="employed_to"
                    type="date"
                    value={formData.employed_to}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="working_hours">Working Hours</Label>
                  <Input
                    id="working_hours"
                    name="working_hours"
                    type="number"
                    value={formData.working_hours}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="employer_name">Employer Name</Label>
                  <Input
                    id="employer_name"
                    name="employer_name"
                    value={formData.employer_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="employer_address">Employer Address</Label>
                  <Input
                    id="employer_address"
                    name="employer_address"
                    value={formData.employer_address}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="employer_contact">Employer Contact</Label>
                  <Input
                    id="employer_contact"
                    name="employer_contact"
                    value={formData.employer_contact}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <Button
                disabled={
                  Object.keys(updatedFiles).length < 0 ||
                  Object.keys(updatedData).length < 0
                }
                onClick={() => handleUpdate("employment")}
              >
                Update Employment Information
              </Button>
            </CardContent>
          </Card>
        );
      case "referees":
        return (
          <Card>
            <CardContent className="space-y-4 pt-6">
              <h2 className="text-xl font-semibold">Referee Information</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Referee 1</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="referee_1_full_name">Full Name</Label>
                      <Input
                        id="referee_1_full_name"
                        name="referee_1_full_name"
                        value={formData.referee_1_full_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_1_position">Position</Label>
                      <Input
                        id="referee_1_position"
                        name="referee_1_position"
                        value={formData.referee_1_position}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_1_organisation">
                        Organisation
                      </Label>
                      <Input
                        id="referee_1_organisation"
                        name="referee_1_organisation"
                        value={formData.referee_1_organisation}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_1_address">Address</Label>
                      <Input
                        id="referee_1_address"
                        name="referee_1_address"
                        value={formData.referee_1_address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_1_postcode">Postcode</Label>
                      <Input
                        id="referee_1_postcode"
                        name="referee_1_postcode"
                        value={formData.referee_1_postcode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_1_telephone_number">
                        Telephone Number
                      </Label>
                      <Input
                        id="referee_1_telephone_number"
                        name="referee_1_telephone_number"
                        value={formData.referee_1_telephone_number}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_1_email_address">
                        Email Address
                      </Label>
                      <Input
                        id="referee_1_email_address"
                        name="referee_1_email_address"
                        type="email"
                        value={formData.referee_1_email_address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_1_capacity_known">
                        Capacity Known
                      </Label>
                      <Input
                        id="referee_1_capacity_known"
                        name="referee_1_capacity_known"
                        value={formData.referee_1_capacity_known}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_1_reference_file">
                        Reference File
                      </Label>
                      {renderFileInput(
                        "referee_1_reference_file",
                        formData.referee_1_reference_file
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Referee 2</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="referee_2_full_name">Full Name</Label>
                      <Input
                        id="referee_2_full_name"
                        name="referee_2_full_name"
                        value={formData.referee_2_full_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_2_position">Position</Label>
                      <Input
                        id="referee_2_position"
                        name="referee_2_position"
                        value={formData.referee_2_position}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_2_organisation">
                        Organisation
                      </Label>
                      <Input
                        id="referee_2_organisation"
                        name="referee_2_organisation"
                        value={formData.referee_2_organisation}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_2_address">Address</Label>
                      <Input
                        id="referee_2_address"
                        name="referee_2_address"
                        value={formData.referee_2_address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_2_postcode">Postcode</Label>
                      <Input
                        id="referee_2_postcode"
                        name="referee_2_postcode"
                        value={formData.referee_2_postcode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_2_telephone_number">
                        Telephone Number
                      </Label>
                      <Input
                        id="referee_2_telephone_number"
                        name="referee_2_telephone_number"
                        value={formData.referee_2_telephone_number}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_2_email_address">
                        Email Address
                      </Label>
                      <Input
                        id="referee_2_email_address"
                        name="referee_2_email_address"
                        type="email"
                        value={formData.referee_2_email_address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_2_capacity_known">
                        Capacity Known
                      </Label>
                      <Input
                        id="referee_2_capacity_known"
                        name="referee_2_capacity_known"
                        value={formData.referee_2_capacity_known}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee_2_reference_file">
                        Reference File
                      </Label>
                      {renderFileInput(
                        "referee_2_reference_file",
                        formData.referee_2_reference_file
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                disabled={
                  Object.keys(updatedFiles).length < 0 ||
                  Object.keys(updatedData).length < 0
                }
                onClick={() => handleUpdate("referees")}
              >
                Update Referee Information
              </Button>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Student Profile</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={currentSection === "personal" ? "default" : "outline"}
          onClick={() => setCurrentSection("personal")}
        >
          Personal
        </Button>
        <Button
          variant={currentSection === "academic" ? "default" : "outline"}
          onClick={() => setCurrentSection("academic")}
        >
          Academic
        </Button>
        <Button
          variant={currentSection === "contact" ? "default" : "outline"}
          onClick={() => setCurrentSection("contact")}
        >
          Contact
        </Button>
        <Button
          variant={currentSection === "additional" ? "default" : "outline"}
          onClick={() => setCurrentSection("additional")}
        >
          Additional
        </Button>
        <Button
          variant={currentSection === "employment" ? "default" : "outline"}
          onClick={() => setCurrentSection("employment")}
        >
          Employment
        </Button>
        <Button
          variant={currentSection === "referees" ? "default" : "outline"}
          onClick={() => setCurrentSection("referees")}
        >
          Referees
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {renderSection(currentSection)}
      </div>
    </div>
  );
}
