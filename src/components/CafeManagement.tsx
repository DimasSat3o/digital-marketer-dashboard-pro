
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, MapPin, Phone, Mail } from "lucide-react";

interface CafeManagementProps {
  cafes: Array<{ id: string; name: string }>;
}

interface CafeDetails {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  status: string;
  createdAt: string;
}

export const CafeManagement = ({ cafes }: CafeManagementProps) => {
  const [cafeDetails, setCafeDetails] = useState<CafeDetails[]>([
    {
      id: "1",
      name: "Kafe Santai",
      address: "Jl. Merdeka No. 123, Jakarta Selatan",
      phone: "021-12345678",
      email: "info@kafesantai.com",
      description: "Kafe cozy dengan suasana santai dan menu kopi premium",
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      name: "Coffee Corner",
      address: "Jl. Sudirman No. 456, Jakarta Pusat",
      phone: "021-87654321",
      email: "hello@coffeecorner.com",
      description: "Coffee shop modern dengan konsep minimalis",
      status: "active",
      createdAt: "2024-02-20"
    },
    {
      id: "3",
      name: "Warung Kopi Asik",
      address: "Jl. Kemang Raya No. 789, Jakarta Selatan", 
      phone: "021-11223344",
      email: "contact@warungkopiasik.com",
      description: "Warung kopi tradisional dengan cita rasa autentik",
      status: "inactive",
      createdAt: "2024-03-10"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<CafeDetails | null>(null);
  const [formData, setFormData] = useState<Partial<CafeDetails>>({});

  const handleAddCafe = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      description: "",
      status: "active"
    });
    setIsAddDialogOpen(true);
  };

  const handleEditCafe = (cafe: CafeDetails) => {
    setSelectedCafe(cafe);
    setFormData(cafe);
    setIsEditDialogOpen(true);
  };

  const handleSaveCafe = () => {
    if (selectedCafe) {
      // Edit existing cafe
      setCafeDetails(cafeDetails.map(cafe => 
        cafe.id === selectedCafe.id ? { ...cafe, ...formData } : cafe
      ));
    } else {
      // Add new cafe
      const newCafe: CafeDetails = {
        id: (cafeDetails.length + 1).toString(),
        createdAt: new Date().toISOString().split('T')[0],
        ...formData as CafeDetails
      };
      setCafeDetails([...cafeDetails, newCafe]);
    }
    
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedCafe(null);
    setFormData({});
  };

  const handleDeleteCafe = (id: string) => {
    setCafeDetails(cafeDetails.filter(cafe => cafe.id !== id));
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">Aktif</Badge>
    ) : (
      <Badge variant="outline">Tidak Aktif</Badge>
    );
  };

  const CafeForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nama Kafe</Label>
        <Input
          id="name"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Masukkan nama kafe"
        />
      </div>

      <div>
        <Label htmlFor="address">Alamat</Label>
        <Textarea
          id="address"
          value={formData.address || ""}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Masukkan alamat lengkap"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input
            id="phone"
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="021-12345678"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="info@kafe.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Deskripsikan kafe Anda"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button 
          variant="outline" 
          onClick={() => {
            setIsAddDialogOpen(false);
            setIsEditDialogOpen(false);
          }}
        >
          Batal
        </Button>
        <Button onClick={handleSaveCafe}>
          {selectedCafe ? "Update" : "Simpan"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Manajemen Kafe</h3>
          <p className="text-gray-600 mt-1">Kelola informasi kafe dan instansi</p>
        </div>
        
        <Button onClick={handleAddCafe} className="flex items-center space-x-2 mt-4 md:mt-0">
          <Plus className="w-4 h-4" />
          <span>Tambah Kafe</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Kafe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{cafeDetails.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Kafe Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {cafeDetails.filter(cafe => cafe.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Kafe Tidak Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {cafeDetails.filter(cafe => cafe.status === "inactive").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cafe List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cafeDetails.map((cafe) => (
          <Card key={cafe.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-lg">{cafe.name}</CardTitle>
                <div className="mt-2">{getStatusBadge(cafe.status)}</div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditCafe(cafe)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteCafe(cafe.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                <p className="text-sm text-gray-600">{cafe.address}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-600">{cafe.phone}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-600">{cafe.email}</p>
              </div>
              
              <p className="text-sm text-gray-600 mt-3">{cafe.description}</p>
              
              <div className="text-xs text-gray-500 mt-3">
                Ditambahkan: {new Date(cafe.createdAt).toLocaleDateString('id-ID')}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Cafe Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Kafe Baru</DialogTitle>
          </DialogHeader>
          <CafeForm />
        </DialogContent>
      </Dialog>

      {/* Edit Cafe Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Kafe</DialogTitle>
          </DialogHeader>
          <CafeForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};
