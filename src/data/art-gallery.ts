// art-gallery.ts — data for the visual arts gallery
// Each entry = one artwork.
//
// Single photo:   paths: ['1.jpeg']
// Multiple views: paths: ['11.jpeg', '11b.jpeg', '11c.jpeg']
//   → first path is the grid thumbnail, rest show in the inner carousel
//
// Optional fields: medium, year — shown in the info panel

export type ArtImage = {
  paths: string[];       // first = thumbnail, rest = extra views
  title: string;
  description?: string;
  medium?: string;       // e.g. "Oil on canvas"
  year?: string;         // e.g. "2023"
};

export const artImages: ArtImage[] = [
  {
    paths: ['1.jpeg', '2.jpeg'], // ← two views of the same artwork
    title: 'Image 1',
    description: 'Description 1',
    medium: 'Oil on canvas',
    year: '2023',
  },
  { paths: ['3.jpeg'],  title: 'Image 3',  description: 'Description 3'  },
  { paths: ['4.jpeg'],  title: 'Image 4',  description: 'Description 4'  },
  { paths: ['5.jpeg'],  title: 'Image 5',  description: 'Description 5'  },
  { paths: ['6.jpeg'],  title: 'Image 6',  description: 'Description 6'  },
  { paths: ['7.jpeg'],  title: 'Image 7',  description: 'Description 7'  },
  { paths: ['8.jpeg'],  title: 'Image 8',  description: 'Description 8'  },
  { paths: ['9.jpeg'],  title: 'Image 9',  description: 'Description 9'  },
  { paths: ['10.jpeg'], title: 'Image 10', description: 'Description 10' },
  { paths: ['11.jpeg'], title: 'Image 11', description: 'Description 11' },
  { paths: ['12.jpeg'], title: 'Image 12', description: 'Description 12' },
  { paths: ['13.jpeg'], title: 'Image 13', description: 'Description 13' },
  { paths: ['14.jpeg'], title: 'Image 14', description: 'Description 14' },
  { paths: ['15.jpeg'], title: 'Image 15', description: 'Description 15' },
  { paths: ['16.jpeg'], title: 'Image 16', description: 'Description 16' },
  { paths: ['17.jpeg'], title: 'Image 17', description: 'Description 17' },
  { paths: ['18.jpeg'], title: 'Image 18', description: 'Description 18' },
  { paths: ['19.jpeg'], title: 'Image 19', description: 'Description 19' },
  { paths: ['20.jpeg'], title: 'Image 20', description: 'Description 20' },
  { paths: ['21.jpeg'], title: 'Image 21', description: 'Description 21' },
  { paths: ['22.jpeg'], title: 'Image 22', description: 'Description 22' },
  { paths: ['23.jpeg'], title: 'Image 23', description: 'Description 23' },
  { paths: ['24.jpeg'], title: 'Image 24', description: 'Description 24' },
  { paths: ['25.jpg'],  title: 'Image 25', description: 'Description 25' },
  { paths: ['26.jpg'],  title: 'Image 26', description: 'Description 26' },
  { paths: ['27.jpg'],  title: 'Image 27', description: 'Description 27' },
];